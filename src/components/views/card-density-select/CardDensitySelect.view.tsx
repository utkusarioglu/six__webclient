import { FC } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import { SelectOnChange } from '../post-feed/PostFeed.view.types';

interface CardDensitySelectViewProps {
  cardType: 'comfy' | 'compact';
  onChange: SelectOnChange;
}

const CardDensitySelectView: FC<CardDensitySelectViewProps> = ({
  cardType,
  onChange,
}) => {
  return (
    <Select value={cardType} onChange={onChange} disableUnderline>
      <MenuItem value="comfy">
        <ViewStreamIcon />
      </MenuItem>
      <MenuItem value="compact">
        <FormatAlignJustifyIcon />
      </MenuItem>
    </Select>
  );
};

export default CardDensitySelectView;
