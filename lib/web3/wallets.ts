import type { WalletType, WalletInfo } from 'types/client/wallets';
// eslint-disable-next-line linebreak-style

import coinbaseIcon from 'icons/wallets/coinbase.svg';
import metamaskIcon from 'icons/wallets/metamask.svg';
import tokenPocketIcon from 'icons/wallets/token-pocket.svg';

export const WALLETS_INFO: Record<Exclude<WalletType, 'none'>, WalletInfo> = {
  metamask: {
    name: 'MetaMask',
    icon: metamaskIcon,
  },
  coinbase: {
    name: 'Coinbase Wallet',
    icon: coinbaseIcon,
  },
  token_pocket: {
    name: 'TokenPocket',
    icon: tokenPocketIcon,
  },
};
