import React from 'react';
import {Pressable} from 'react-native';

/**
 *
 * @param {*} loading return loading view when component load data or fetch api
 */
const TouchableCo = props => {
  const {children} = props;
  return <Pressable {...props}>{children}</Pressable>;
};

export {TouchableCo};
