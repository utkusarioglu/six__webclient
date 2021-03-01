import type { FC } from 'react';
import Timeago from 'react-timeago';
//@ts-ignore
import enShortStrings from 'react-timeago/lib/language-strings/en-short';
//@ts-ignore
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

interface RelativeDateViewProps {
  date: string;
}

const formatter = buildFormatter(enShortStrings);

const RelativeDateView: FC<RelativeDateViewProps> = ({ date }) => {
  return <Timeago date={date} formatter={formatter} />;
};

export default RelativeDateView;
