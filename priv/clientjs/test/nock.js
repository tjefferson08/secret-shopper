import nock from 'nock';

nock.disableNetConnect();

const _nock = () => nock('http://localhost');

export const isDone = () => nock.isDone();

export default _nock;
