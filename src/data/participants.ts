import aivenLogo from '/src/assets/images/aiven.svg';
import awsLogo from '/src/assets/images/aws.svg';
import perconaLogo from '/src/assets/images/percona.svg';
import upcloudLogo from '/src/assets/images/upcloud.svg';

export interface Participant {
  name: string;
  desc: string;
  logo: string;
}

export const participants: Participant[] = [
  {
    name: 'Aiven',
    desc: 'In-memory NoSQL database with a small footprint and big performance. It is built on open source Valkey and compatible with legacy Redis®',
    logo: aivenLogo,
  },
  {
    name: 'Amazon Web Services',
    desc: 'It merges Valkeys speed and versatility with Amazons manageability, perfect for data-driven applications.',
    logo: awsLogo,
  },
  {
    name: 'Pepercona',
    desc: 'Provides Valkey expertise whenever you need it, offering day-to-day operational support and hands-on assistance for complex projects.',
    logo: perconaLogo,
  },
  {
    name: 'UpCloud',
    desc: 'With UpClouds global reach, Valkey guarantees reliability and scalability, allowing developers to focus on building outstanding applications.',
    logo: upcloudLogo,
  },
]; 