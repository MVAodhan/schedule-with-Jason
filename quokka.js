let newLinks = [
  {
    id: 'demo',
    value: 'https://www.youtube.com',
  },
  {
    id: '8265d5bd-be1f-495f-bf18-0b7e6d7b6a31',
    value:
      'https://blog.webpagetest.org/posts/introducing-opportunities-and-experiments/',
  },
  {
    id: 'a27edbe8-88a9-4ee7-93b6-a209b1c8fb91',
    value: 'https://www.learnwithjason.dev/',
  },
  {
    id: '5ddb9394-49fa-4929-b73f-eb74b4992c18',
    value: 'https://twitter.com/scottjehl',
  },
  {
    id: '785503a6-aec9-4f16-a781-261c17f36ea5',
    value: 'https://www.webpagetest.org/',
  },
  {
    id: '31640266-1200-4b2c-9071-b79dbc4cc298',
    value: 'https://www.webpagetest.org/themetrictimes/index.php',
  },
  {
    id: '93b30b74-06eb-48a0-b824-e5ce26e6f5fd',
    value: 'https://twitter.com/tkadlec/status/1536689811473543172',
  },
  {
    id: '794ed10f-3a64-4d7d-ad4b-e6ed15f9532e',
    value: 'https://twitter.com/realwebpagetest',
  },
  {
    id: 'c85ee84b-6fda-4eb0-ae92-d0ad8b5a88f1',
    value: 'https://www.twitch.tv/webpagetest',
  },
  {
    id: 'c85ee84b-6fda-4eb0-ae92-d0ad8b5a88f1',
    value: 'https://www.twitch.tv/webpagetest',
  },
  {
    id: 'c85ee84b-6fda-4eb0-ae92-d0ad8b5a88f1',
    value: 'https://www.twitch.tv/webpagetest',
  },
  {
    id: 'c85ee84b-6fda-4eb0-ae92-d0ad8b5a88f1',
    value: 'https://www.twitch.tv/webpagetest',
  },
];

const linkValues = newLinks.map((link) => link['value']);
const cleanedValues = new Set(linkValues);
const cleanSpread = [...cleanedValues];
let linkIDs = newLinks.map((link) => link['id']);
const forEachObj = () => {};
let newLinksObj = [];
linkIDs.forEach((linkID, i) => {
  if (linkID === 'demo' || linkID === 'repo') {
    let newLink = { id: linkID, value: cleanSpread[i] };
    newLinksObj = [...newLinksObj, newLink];
  } else {
    let newLink = { id: linkID, value: cleanSpread[i] };
    newLinksObj = [...newLinksObj, newLink];
  }
  return newLinksObj;
});
console.log(newLinksObj);
