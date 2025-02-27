import { IconType } from 'react-icons';
import { BiSolidBookBookmark } from 'react-icons/bi';
import {
  BsBugFill,
  BsFillLightbulbFill,
  BsFillQuestionCircleFill,
  BsShieldLockFill,
} from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export interface ContributeWay {
  title: string;
  description: string;
  icon: IconType;
  buttons?: {
    label: string;
    href: string;
    icon?: IconType;
  }[];
}

export const contributeWays: ContributeWay[] = [
  {
    icon: BsFillQuestionCircleFill,
    title: 'Ask Questions',
    description:
      'If you have any inquiries about Valkey, feel free to join the conversation on our GitHub discussions or chat with us on Matrix.',
    buttons: [
      { label: 'GitHub Repository', href: 'https://github.com/valkey-xyz/valkey', icon: FiGithub },
      { label: 'Matrix', href: 'https://matrix.to/#/#valkey:matrix.org' },
    ],
  },
  {
    icon: BsBugFill,
    title: 'Report Bugs',
    description:
      'If you encounter any issues while using Valkey, please help us improve the project by filing a bug report at our GitHub repository.',
    buttons: [
      {
        label: 'GitHub Repository',
        href: 'https://github.com/valkey-xyz/valkey/issues',
        icon: FiGithub,
      },
    ],
  },
  {
    icon: FaPeopleGroup,
    title: 'Connect on Social Media',
    description: 'Stay updated and connect with us on our social media platforms.',
    buttons: [
      { label: 'LinkedIn', href: 'https://linkedin.com/company/valkey', icon: FiLinkedin },
      { label: 'Twitter', href: 'https://twitter.com/valkeyxyz', icon: FiTwitter },
    ],
  },
  {
    icon: BsFillLightbulbFill,
    title: 'Suggest Features',
    description:
      'We value your ideas! If you have a suggestion for a new feature, please submit a feature request on our GitHub.',
    buttons: [
      {
        label: 'GitHub',
        href: 'https://github.com/valkey-xyz/valkey/issues',
        icon: FiGithub,
      },
    ],
  },
  {
    icon: BsShieldLockFill,
    title: 'Security Concerns',
    description: 'For any potential security issues, please refer to our Security Policy.',
    buttons: [{ label: 'Learn more →', href: '/security-policy' }],
  },
  {
    icon: BiSolidBookBookmark,
    title: 'Community Conduct',
    description:
      'If you experience any issues with community members behavior, kindly check our Code of Conduct for guidance.',
    buttons: [{ label: 'Learn more →', href: '/community/code-of-conduct' }],
  },
]; 