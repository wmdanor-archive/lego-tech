import React, { FC, PropsWithChildren } from 'react';
import { Container } from 'reactstrap';

interface Props extends PropsWithChildren {
  className?: string;
}

const PageLayout: FC<Props> = ({ children, className, ...props}) => {
  return (
    <Container {...props} className={`flex-grow-1 bg-white my-sm-3 shadow-sm ${className ?? ''}`}>
      {children}
    </Container>
  );
};

export default PageLayout;
