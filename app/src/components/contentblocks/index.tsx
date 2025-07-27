import Box from '@mui/material/Box';
import type {
  ContentBlock,
  ImageBlock,
  ParagraphBlock,
  SubtitleBlock,
} from '../../data';
import { resolveImagePath } from '../../util/util';

import Typography from '@mui/material/Typography';
import './index.scss';

export const Image = ({ contentBlock }: { contentBlock: ImageBlock }) => {
  console.log('rendering image', contentBlock);
  return (
    <Box className="contentblock-image">
      <img
        className="contentblock-image__media"
        src={resolveImagePath(contentBlock.url ?? '')}
        alt={contentBlock.title}
      />
      <p className="contentblock-image__title">{contentBlock.title}</p>
    </Box>
  );
};

export const Paragraph = ({
  contentBlock,
}: {
  contentBlock: ParagraphBlock;
}) => {
  return <p className="contentblock-paragraph">{contentBlock.text}</p>;
};

export const Subtitle = ({ contentBlock }: { contentBlock: SubtitleBlock }) => {
  return (
    <Typography variant="h4" className="contentblock-subtitle">
      {contentBlock.text}
    </Typography>
  );
};

export const Block = ({ contentBlock }: { contentBlock: ContentBlock }) => {
  switch (contentBlock.type) {
    case 'paragraph': {
      return <Paragraph contentBlock={contentBlock as ParagraphBlock} />;
    }
    case 'image': {
      return <Image contentBlock={contentBlock as ImageBlock} />;
    }
    case 'subtitle': {
      return <Subtitle contentBlock={contentBlock as SubtitleBlock} />;
    }
    default: {
      return <></>;
    }
  }
};
