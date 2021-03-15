import { FC } from 'react';

interface TabPanelViewProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
export const TabPanelView: FC<TabPanelViewProps> = ({
  children,
  value,
  index,
  ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && children}
  </div>
);
