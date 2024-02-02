import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate = ({ url }: { url: string }) => {
  return (
    <div>
      <h1>Welcome, {url}!</h1>
    </div>
  );
};
