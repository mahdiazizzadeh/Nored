declare module "net" {
  interface Socket {
    isPending: boolean;
  }
}
