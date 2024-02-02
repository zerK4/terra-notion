'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { useForm } from 'react-hook-form';
import { authFormSchema } from '@/src/validators/auth';
import { z } from 'zod';
import { Form } from '@/src/components/ui/form';
import { Field } from '@/src/components/form/field';
import { useState } from 'react';
import { Spinner } from '@/src/components/Spinner';
import SuccessEmail from '@/src/components/form/successEmial';
import { login } from '@/src/app/actions/authActions';

function Page() {
  const [noAccount, setNoAccount] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      name: '' || null,
    },
  });
  const signIn = async (values: z.infer<typeof authFormSchema>) => {
    try {
      setLoading(true);

      values.email = values.email.toLowerCase();

      const data = await login(values);
      console.log(data);
      if (data.status === 200) {
        setSuccess(true);
      }
      if (data.status === 404) {
        setNoAccount(true);
      }
    } catch (err: any) {
      console.log(err.message, 'Error atempting to login.');

      return err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center flex-col justify-center h-screen w-screen overflow-hidden bg-black">
      {success ? (
        <SuccessEmail />
      ) : (
        <Card className="w-full sm:w-[25rem]">
          <CardHeader className="text-3xl">
            {noAccount ? 'Register' : 'Login'}
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(signIn)} className="space-y-4">
                <Field
                  description="We will send you an email using this address if you have an account."
                  form={form}
                  label="Email"
                  name="email"
                  placeholder="email@"
                />
                {noAccount && (
                  <Field
                    description="This will be used as your name on the platform."
                    form={form}
                    label="Name"
                    name="name"
                    placeholder="name"
                  />
                )}
                <Button
                  type="submit"
                  className="bg-foreground text-background hover:bg-foreground/50"
                >
                  {loading ? <Spinner color="blackB" /> : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Page;
