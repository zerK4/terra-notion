export interface UserInterface {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  gender: any;
  birthday: any;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: any;
  primaryWeb3WalletId: any;
  lastSignInAt: number;
  externalId: any;
  username: any;
  firstName: string;
  lastName: string;
  publicMetadata: any;
  privateMetadata: any;
  unsafeMetadata: any;
  emailAddresses: {
    id: string;
    emailAddress: string;
    verification: any;
    linkedTo: any;
  }[];
  phoneNumbers: any[];
  web3Wallets: any[];
  externalAccounts: any[];
  createOrganizationEnabled: boolean;
}
