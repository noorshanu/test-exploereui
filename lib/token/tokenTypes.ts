import type { TokenType } from 'types/api/token';

const TOKEN_TYPE: Array<{ title: string; id: TokenType }> = [
  { title: 'DRC-20', id: 'DRC-20' },
  { title: 'ERC-721', id: 'ERC-721' },
  { title: 'ERC-1155', id: 'ERC-1155' },
];

export default TOKEN_TYPE;
