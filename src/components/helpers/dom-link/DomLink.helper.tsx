import type { FC } from 'react';
import { Link as Domlink } from 'react-router-dom';

// !any
type DomLinkHelper = (target: string) => FC<any>;

/**
 * A wrapper for react-router-dom Link component that allows it to be
 * easily customized for different routes and be consumed by Material-ui' s
 * component prop
 *
 * @param target {string} the target url to link to
 * */
const domLinkHelper: DomLinkHelper = (target) => (props) => (
  <Domlink to={target.toLowerCase()} {...props} />
);

export default domLinkHelper;
