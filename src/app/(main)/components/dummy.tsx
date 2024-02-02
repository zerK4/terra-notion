'use client';

import { UserType } from '@/src/db/schema';
import { UserInterface } from '@/src/interfaces/user';
import { useAuthStore } from '@/src/store/auth';
import React, { useEffect } from 'react';

function Dummy({ user }: { user?: any }) {
  useEffect(() => {
    useAuthStore.setState({
      user: user,
    });
  }, [user]);

  return <></>;
}

export default Dummy;
