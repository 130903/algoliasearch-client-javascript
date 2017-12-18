import { initClient } from 'algoliasearch';

it('can initialize a client', async () => {
  const client = initClient({
    appId: 'latency',
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  });
  expect(
    client.search({ requests: [{ indexName: 'bestbuy', query: 'a' }] })
  ).resolves.toMatchSnapshot();
});
