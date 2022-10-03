/* eslint-disable react/no-unstable-nested-components */
import React, { FC } from 'react';

interface IRouteWithLayoutProps {
  component: any;
  layout: any;
}
const RouteWithLayout: FC<IRouteWithLayoutProps> = ({
  layout: Layout,
  component: Component,
  ...matchProps
}) => (
  <Layout>
    <Component {...matchProps} />
  </Layout>);

export default RouteWithLayout;
