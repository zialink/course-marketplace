import { useWeb3 } from "@components/providers";
import Link from "next/link";
import { Button } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useRouter } from "next/router";

export default function Navbar() {
  const { connect, requireInstall, isLoading } = useWeb3();
  const { account } = useAccount();
  const { pathname } = useRouter();
  return (
    <section>
      <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex items-center justify-between">
            <div>
              <Link href={"/"}>
                <a className="mr-8 font-medium text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href={"/marketplace"}>
                <a className="mr-8 font-medium text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href={"/"}>
                <a className="mr-8 font-medium text-gray-500 hover:text-gray-900">
                  Blog
                </a>
              </Link>
            </div>
            <div>
              <Link href={"/"}>
                <a className="mr-8 font-medium text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              {isLoading ? (
                <Button disabled={true}>Loading...</Button>
              ) : account.data ? (
                account.isAdmin ? (
                  <Button>My Students</Button>
                ) : (
                  <Button>My Courses</Button>
                )
              ) : requireInstall ? (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download", "_blank")
                  }
                >
                  Install Metamask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end p-1 sm:px-6 lg:px-8">
          <div className="rounded-md bg-indigo-600 p-2 text-white">
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
}
