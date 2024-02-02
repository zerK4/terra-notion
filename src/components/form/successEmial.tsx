import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

function SuccessEmail() {
  return (
    <Card>
      <CardHeader className="text-2xl">Success!</CardHeader>
      <CardContent>We have sent you an email, check it to login!</CardContent>
      <CardFooter className="text-foreground/50">
        You can close this window.
      </CardFooter>
    </Card>
  );
}

export default SuccessEmail;
