import { Parse } from './back4appConfig';

export const CLASS_TAREFA = 'Tarefa';

export function mensagemErroParse(error) {
  if (!error) return 'Erro inesperado.';
  if (error.code === Parse.Error.USERNAME_TAKEN) return 'Este e-mail já está em uso.';
  if (error.code === Parse.Error.EMAIL_TAKEN) return 'Este e-mail já está cadastrado.';
  if (error.code === Parse.Error.DUPLICATE_VALUE) return 'Este valor já existe (e-mail ou usuário duplicado).';
  if (error.code === Parse.Error.INVALID_EMAIL_ADDRESS) return 'E-mail inválido. Verifique o formato.';
  if (error.code === Parse.Error.CONNECTION_FAILED)
    return 'Sem conexão com o servidor. Verifique a internet e as chaves no .env.';
  if (error.code === Parse.Error.NOT_INITIALIZED)
    return 'Parse não inicializou. Confira EXPO_PUBLIC_BACK4APP_APP_ID e JS_KEY e reinicie o Expo.';
  if (error.code === Parse.Error.OPERATION_FORBIDDEN)
    return 'Cadastro de usuários pode estar desabilitado no Back4App (veja App Settings → Features).';
  if (error.code === Parse.Error.INVALID_SESSION_TOKEN)
    return 'Sessão inválida. Faça login novamente.';
  if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
    const msg = (error.message || '').toLowerCase();
    if (msg.includes('username') || msg.includes('password') || msg.includes('invalid')) {
      return 'E-mail ou senha incorretos.';
    }
  }
  if (error.message) return error.message;
  return 'Não foi possível concluir a operação.';
}

export function ehErroSessaoInvalida(error) {
  return error?.code === Parse.Error.INVALID_SESSION_TOKEN;
}

/** Remove sessão antiga/inválida do AsyncStorage (evita erro 209 nas requisições). */
export async function limparSessaoAntesDeAuth() {
  try {
    await Parse.User.logOut();
  } catch {
    // sem sessão ou token já inválido
  }
}

/**
 * Carrega o usuário do storage e valida o token no servidor.
 * Token inválido no header quebra até queries públicas (erro 209).
 */
export async function restaurarSessaoValida() {
  try {
    let user = await Parse.User.currentAsync();
    if (!user) user = Parse.User.current();
    if (!user) return null;
    await user.fetch();
    return user;
  } catch (error) {
    if (ehErroSessaoInvalida(error)) {
      await limparSessaoAntesDeAuth();
      return null;
    }
    throw error;
  }
}

async function executarComSessao(operacao) {
  try {
    return await operacao();
  } catch (error) {
    if (ehErroSessaoInvalida(error)) await limparSessaoAntesDeAuth();
    throw error;
  }
}

/** Nome exibido na Home e mensagens de boas-vindas (não usa e-mail). */
export function nomeExibicaoUsuario(user) {
  if (!user) return 'Usuário';
  const nome = user.get('nome')?.trim();
  if (nome) return nome;
  return 'Usuário';
}

/**
 * Cadastro: login com e-mail; campo nome salvo em `nome` no _User.
 */
export async function cadastrarUsuario(email, senha, nome) {
  await limparSessaoAntesDeAuth();
  const limpo = email.trim().toLowerCase();
  const nomeLimpo = nome.trim();
  const user = new Parse.User();
  user.set('username', limpo);
  user.set('email', limpo);
  user.set('password', senha);
  user.set('nome', nomeLimpo);
  await user.signUp();
  const logado = await Parse.User.currentAsync();
  if (!logado) throw new Error('Não foi possível salvar a sessão após o cadastro.');
  return logado;
}

export async function fazerLogin(emailOuUsername, senha) {
  await limparSessaoAntesDeAuth();
  const id = emailOuUsername.trim().toLowerCase();
  await Parse.User.logIn(id, senha);
  const user = await Parse.User.currentAsync();
  if (!user) throw new Error('Não foi possível salvar a sessão após o login.');
  return user;
}

export async function fazerLogout() {
  return Parse.User.logOut();
}



export function tarefaParaItem(obj) {
  return {
    objectId: obj.id,
    titulo: obj.get('titulo') ?? '',
    descricao: obj.get('descricao') ?? '',
    data: obj.get('data') ?? '',
    status: obj.get('status') ?? '',
    prioridade: obj.get('prioridade') ?? '',
  };
}

async function queryTarefasDoUsuario() {
  const user = await restaurarSessaoValida();
  if (!user) {
    const err = new Error('Sessão inválida.');
    err.code = Parse.Error.INVALID_SESSION_TOKEN;
    throw err;
  }
  const Tarefa = Parse.Object.extend(CLASS_TAREFA);
  const q = new Parse.Query(Tarefa);
  q.equalTo('usuario', user);
  q.addDescending('data');
  q.addDescending('createdAt');
  return q;
}

export async function listarRegistros() {
  return executarComSessao(async () => {
    const results = await (await queryTarefasDoUsuario()).find();
    return results.map(tarefaParaItem);
  });
}

export async function obterRegistroPorId(objectId) {
  return executarComSessao(async () => {
    const t = await (await queryTarefasDoUsuario()).get(objectId);
    return tarefaParaItem(t);
  });
}



export async function criarRegistro({ titulo, descricao, data, status, prioridade }) {
  return executarComSessao(async () => {
    const user = await restaurarSessaoValida();
    if (!user) {
      const err = new Error('Sessão inválida.');
      err.code = Parse.Error.INVALID_SESSION_TOKEN;
      throw err;
    }
    const Tarefa = Parse.Object.extend(CLASS_TAREFA);
    const t = new Tarefa();
    t.set('titulo', titulo.trim());
    t.set('descricao', descricao.trim());
    t.set('data', data.trim());
    t.set('status', status.trim());
    if (prioridade && prioridade.trim()) t.set('prioridade', prioridade.trim());
    else t.unset('prioridade');
    t.set('usuario', user);
    await t.save();
    return tarefaParaItem(t);
  });
}

export async function atualizarRegistro(objectId, { titulo, descricao, data, status, prioridade }) {
  return executarComSessao(async () => {
    const t = await (await queryTarefasDoUsuario()).get(objectId);
    t.set('titulo', titulo.trim());
    t.set('descricao', descricao.trim());
    t.set('data', data.trim());
    t.set('status', status.trim());
    if (prioridade && prioridade.trim()) t.set('prioridade', prioridade.trim());
    else t.unset('prioridade');
    await t.save();
    return tarefaParaItem(t);
  });
}

export async function excluirRegistro(objectId) {
  return executarComSessao(async () => {
    const t = await (await queryTarefasDoUsuario()).get(objectId);
    await t.destroy();
  });
}
