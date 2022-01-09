export type RootStackParamList = {
  Welcome: undefined;
  LogIn: { username: string; password: string } | undefined;
  CreateAccount: undefined;
  Search: undefined;
  CoffeeShopScreen: { coffeeShopId: number };
  Profile: { username: string };
  Feed: undefined;
  Comments: undefined;
  Likes: { coffeeShopId: number };
  Me: undefined;
  SelectPhoto: undefined;
  TakePhoto: undefined;
  Tabs: undefined;
  UploadForm: { file: string };
};
