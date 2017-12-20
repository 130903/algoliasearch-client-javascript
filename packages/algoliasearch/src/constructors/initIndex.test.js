import initIndex from './initIndex.js';

const validParams = {
  appId: 'some_app',
  apiKey: 'some_key',
  indexName: 'some_index',
};

it('initIndex throws when it has too little parameters', () => {
  expect(() => initIndex({})).toThrow();
  expect(() => initIndex({ appId: '' })).toThrowErrorMatchingSnapshot();
  expect(() => initIndex({ apiKey: '' })).toThrowErrorMatchingSnapshot();
  expect(() =>
    initIndex({ apiKey: '', appId: '' })
  ).toThrowErrorMatchingSnapshot();

  expect(() => initIndex(validParams)).not.toThrow();
});

it('initIndex contains the correct methods', () => {
  const index = initIndex(validParams);
  expect(Object.keys(index)).toMatchSnapshot();
});

it('index.search() works 🐣', async () => {
  const index = initIndex(validParams);
  const result = await index.search({ query: 'hello world' });
  expect(result).toMatchSnapshot();
});

it('allows you to pass a http requester', async () => {
  const httpRequester = jest.fn(() => Promise.resolve({}));
  const index = initIndex({ ...validParams, httpRequester });
  await index.search({ test: 'bingo' });
  expect(httpRequester).toHaveBeenCalledTimes(1);
});
