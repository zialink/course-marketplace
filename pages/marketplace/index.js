import { useAccount } from "@components/hooks/web3/useAccount";
import { useNetwork } from "@components/hooks/web3/useNetwork";
import { Breadcrumbs, Button } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { EthRates, WalletBar } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { account } = useAccount();
  const { network } = useNetwork();

  const canPurchaseCourse = !!(account.data && network.isSupported);
  return (
    <>
      <div>
        <WalletBar address={account.data} network={network} />
        <Breadcrumbs />
        <EthRates />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            course={course}
            key={course.id}
            disabled={!canPurchaseCourse}
            Purchase={() => {
              return (
                <div className="mt-4">
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    className="absolute bottom-0 right-0"
                    variant="lightPurple"
                    disabled={!canPurchaseCourse}
                  >
                    Purchase
                  </Button>
                </div>
              );
            }}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
