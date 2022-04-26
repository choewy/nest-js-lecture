/* NODE_ENV에 해당하는 .env 파일 파싱 */
const envDirPath = `${__dirname}/env`;
const envFiles = () =>
  process.env.NODE_ENV === 'production'
    ? [`${envDirPath}/.production.env`]
    : [`${envDirPath}/.development.env`];

export default {
  envFilePath: envFiles(),
  isGlobal: true,
  load: [],
};
