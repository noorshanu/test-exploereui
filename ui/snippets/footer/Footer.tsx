import { Box, Grid, Flex, Text, Link, VStack, Skeleton, Center, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Telegram from 'icons/social/telega.svg'
import Linkedin from 'icons/social/linkedin_filled.svg'
import type { CustomLinksGroup } from 'types/footerLinks';
import Image from 'next/image';
import config from 'configs/app';
import infoIcon from 'icons/info.svg';
import editIcon from 'icons/edit.svg';
import cannyIcon from 'icons/social/canny.svg';
import discordIcon from 'icons/social/discord.svg';
import gitIcon from 'icons/social/git.svg';
import twitterIcon from 'icons/social/tweet.svg';
import type { ResourceError } from 'lib/api/resources';
import useApiQuery from 'lib/api/useApiQuery';
import useFetch from 'lib/hooks/useFetch';
import useIssueUrl from 'lib/hooks/useIssueUrl';
import IndexingAlertIntTxs from 'ui/home/IndexingAlertIntTxs';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import ColorModeToggler from '../header/ColorModeToggler';
import FooterLinkItem from './FooterLinkItem';
import getApiVersionUrl from './utils/getApiVersionUrl';

const MAX_LINKS_COLUMNS = 3;

const FRONT_VERSION_URL = `https://github.com/${ config.UI.footer.frontendVersion }`;

const Footer = () => {

  const { data: backendVersionData } = useApiQuery('config_backend_version', {
    queryOptions: {
      staleTime: Infinity,
    },
  });
  const apiVersionUrl = getApiVersionUrl(backendVersionData?.backend_version);
  const issueUrl = 'https://forum.deelance.com/';
  const BLOCKSCOUT_LINKS = [
    {
      icon: editIcon,
      iconSize: '16px',
      text: 'Submit an issue',
      url: issueUrl,
    },
    {
      icon: cannyIcon,
      iconSize: '20px',
      text: 'Feature request',
      url: issueUrl,
    },
    {
      icon: gitIcon,
      iconSize: '18px',
      text: 'Contribute',
      url: '#',
    },
    {
      icon: infoIcon,
      iconSize: '18px',
      text: 'Bugs Report',
      url: '#',
    },
    {
      icon: twitterIcon,
      iconSize: '18px',
      text: 'Twitter',
      url: 'https://twitter.com/deelance_com',
    },
    {
      icon: discordIcon,
      iconSize: '18px',
      text: 'Discord',
      url: 'https://discord.com/invite/vhH3Sbt9NQ',
    },
    {
      icon: Telegram,
      iconSize: '18px',
      text: 'Telegram',
      url: 'https://t.me/deelance_com',
    },
    {
      icon: Linkedin,
      iconSize: '18px',
      text: 'Linked In',
      url: 'https://www.linkedin.com/company/deelance/',
    },
  
 

    // {
    //   icon: telegramIcon,
    //   iconSize: '20px',
    //   text: 'Discussions',
    //   url: 'https://github.com/orgs/blockscout/discussions',
    // },
  ];

  const fetch = useFetch();

  const { isLoading, data: linksData } = useQuery<unknown, ResourceError<unknown>, Array<CustomLinksGroup>>(
    [ 'footer-links' ],
    async() => fetch(config.UI.footer.links || ''),
    {
      enabled: Boolean(config.UI.footer.links),
      staleTime: Infinity,
    });

    const logoSrc =  useColorModeValue("/static/logoLight.png", "/static/whitelogo.png");

  return (
    <>
       <Flex
      direction={{ base: 'column', lg: 'row' }}
      p={{ base: 4, lg: 9 }}
      borderTop="1px solid"
      borderColor="divider"
      as="footer"
      columnGap="100px"
    >
      <Box flexGrow="1" mb={{ base: 8, lg: 0 }}>
        <Flex flexWrap="wrap" columnGap={ 8 } rowGap={ 6 }>
          <ColorModeToggler/>
          { !config.UI.indexingAlert.isHidden && <IndexingAlertIntTxs/> }
          <NetworkAddToWallet/>
        </Flex>
        <Box mt={{ base: 5, lg: '44px' }}>
        
          <Link fontSize="xs" href="https://www.deelance.com">  <Image src={logoSrc} alt=''   width={165}
        height={165}/></Link>
        </Box>
        <Text mt={ 3 } maxW={{ base: 'unset', lg: '470px' }} fontSize="xs">
        DeeLance is at the forefront of the revolution. With our decentralized approach, we're connecting freelancers and recruiters, leveraging the power of blockchain technology.
        </Text>
        <VStack spacing={ 1 } mt={ 6 } alignItems="start">
          { apiVersionUrl && (
            <Text fontSize="xs">
                Backend: <Link href={ apiVersionUrl } target="_blank">{ backendVersionData?.backend_version }</Link>
            </Text>
          ) }
          { (config.UI.footer.frontendVersion || config.UI.footer.frontendCommit) && (
            <Text fontSize="xs">
              Frontend: <Link href={ FRONT_VERSION_URL } target="_blank">{ config.UI.footer.frontendVersion }</Link>
            </Text>
          ) }
        </VStack>
      </Box>
      <Grid
        gap={{ base: 6, lg: 12 }}
        gridTemplateColumns={ config.UI.footer.links ?
          { base: 'repeat(auto-fill, 160px)', lg: `repeat(${ (linksData?.length || MAX_LINKS_COLUMNS) + 1 }, 160px)` } :
          'auto'
        }
      >
        <Box minW="160px" w={ config.UI.footer.links ? '160px' : '100%' }>
          { config.UI.footer.links && <Text fontWeight={ 500 } mb={ 3 }>Blockscout</Text> }
          <Grid
            gap={ 1 }
            gridTemplateColumns={ config.UI.footer.links ? '160px' : { base: 'repeat(auto-fill, 160px)', lg: 'repeat(3, 160px)' } }
            gridTemplateRows={{ base: 'auto', lg: config.UI.footer.links ? 'auto' : 'repeat(4, auto)' }}
            gridAutoFlow={{ base: 'row', lg: config.UI.footer.links ? 'row' : 'column' }}
            mt={{ base: 0, lg: config.UI.footer.links ? 0 : '100px' }}
          >
            { BLOCKSCOUT_LINKS.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
          </Grid>
        </Box>
        { config.UI.footer.links && isLoading && (
          Array.from(Array(3)).map((i, index) => (
            <Box minW="160px" key={ index }>
              <Skeleton w="120px" h="20px" mb={ 6 }/>
              <VStack spacing={ 5 } alignItems="start" mb={ 2 }>
                { Array.from(Array(5)).map((i, index) => <Skeleton w="160px" h="14px" key={ index }/>) }
              </VStack>
            </Box>
          ))
        ) }
        { config.UI.footer.links && linksData && (
          linksData.slice(0, MAX_LINKS_COLUMNS).map(linkGroup => (
            <Box minW="160px" key={ linkGroup.title }>
              <Text fontWeight={ 500 } mb={ 3 }>{ linkGroup.title }</Text>
              <VStack spacing={ 1 } alignItems="start">
                { linkGroup.links.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
              </VStack>
            </Box>
          ))
        ) }
      </Grid>
    </Flex>
    <Box textAlign={'center'}>
      <Text fontSize={'12px'}>2023© DeeLance labs LTD | All Rights Reserved
Ajeltake Road , Reg no: 119495 , Marshall Islands, info@deelance.com</Text>
    </Box>
    </>
 
  );
};

export default Footer;
