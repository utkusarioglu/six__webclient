import { ChangeEvent } from 'react';

export type SelectOnChange = (e: ChangeEvent<{ value: unknown }>) => void;
export interface PostFeedViewProps {
  communitySlug?: string;
}
export type PostCardTypes = 'comfy' | 'compact';
