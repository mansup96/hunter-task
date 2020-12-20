import axios from 'axios';
import Mocker from 'axios-mock-adapter';
import { v4 as uuidv4 } from 'uuid';

const mock = new Mocker(axios, { delayResponse: 500 });

type TUser = {
  id: string;
  password: string;
  email: string;
  name: string;
};

type TSession = {
  userId: string;
  token: string;
};

const getSavedUsers = (): TUser[] | [] => {
  const savedUsers = localStorage.getItem('hunterUsers');
  return savedUsers ? JSON.parse(savedUsers) : [];
};

const setSavedUsers = (users: TUser[]) => {
  localStorage.setItem('hunterUsers', JSON.stringify(users));
};

const createSession = (user: TUser): string => {
  const jsonOpenSessions = localStorage.getItem('hunterSessions');
  const openSessions = jsonOpenSessions ? JSON.parse(jsonOpenSessions) : [];
  const token = uuidv4();
  openSessions.push({ userId: user.id, token });
  localStorage.setItem('hunterSessions', JSON.stringify(openSessions));
  return token;
};

export const CREATED = 201,
  OK = 200,
  FORBIDDEN = 403;

mock.onPost('/login').reply(req => {
  const { email, password } = JSON.parse(req.data);

  if (!(email && password))
    return [FORBIDDEN, { common: 'Введите корректные данные' }];

  const savedUsers = getSavedUsers();
  const user = savedUsers.find(user => (user.email = email));

  if (!(user && user.password === password))
    return [FORBIDDEN, { common: 'Неверный e-mail или пароль' }];

  const { password: pass, ...me } = user;

  const accessToken = createSession(user);
  return [OK, { ...me, accessToken }];
});

mock.onPost('/sign_up').reply(req => {
  const { password, email, name, passwordConfirmation } = JSON.parse(req.data);

  if (
    !(
      name &&
      email &&
      password &&
      passwordConfirmation &&
      password === passwordConfirmation
    )
  )
    return [FORBIDDEN, { common: 'Введите корректные данные' }];

  const newUser = { id: uuidv4(), password, email, name };
  const savedUsers = getSavedUsers();

  if (savedUsers.some((user: TUser) => user.email === email))
    return [
      FORBIDDEN,
      {
        email: 'Пользователь с таким E-mail уже существует',
      },
    ];

  setSavedUsers([...savedUsers, newUser]);
  const { password: pass, ...responseData } = newUser;

  return [CREATED, responseData];
});

mock.onPost('/me').reply(req => {
  const refuse = () => [FORBIDDEN, { common: 'Cессия не существует' }];
  const token = req.data;

  if (!token) return refuse();

  const sessionJson = localStorage.getItem('hunterSessions');
  if (!sessionJson) return refuse();

  const session = JSON.parse(sessionJson).find(
    (s: TSession) => s.token === token
  );
  if (!session) return refuse();

  const user = getSavedUsers().find(u => u.id === session.userId);
  if (!user) return refuse();

  const { password, ...me } = user;
  return [200, { ...me }];
});

mock.restore();

export default axios;
