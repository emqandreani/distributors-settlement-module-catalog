import { useLocalDispatch, useLocalSelector } from "app/store";
import {
  selectorDistributionConcept,
  setFilteredDataDistribution,
} from "features/distribution-concept/slice";
import { selectorSearch } from "features/search/slice";
import { selectorServiceConcept, setFilteredDataService } from "features/service-concept/slice";
import { useEffect } from "react";

const useReduxSearch = () => {
  const { flag, searchValue, selector } = useLocalSelector(selectorSearch);
  const { ...distributionConceptProps } = useLocalSelector(selectorDistributionConcept);
  const { ...serviceConceptProps } = useLocalSelector(selectorServiceConcept);
  const dispatch = useLocalDispatch();

  useEffect(() => {
    if (selector === "distributionConcept")
      dispatch(
        setFilteredDataDistribution(
          distributionConceptProps.data.filter((el) =>
            el.description
              .toLocaleLowerCase()
              .trim()
              .includes(searchValue!.toLocaleLowerCase().trim() as string)
          )
        )
      );
    else if (selector === "serviceConcept")
      dispatch(
        setFilteredDataService(
          serviceConceptProps.data.filter((el) =>
            el.description
              .toLocaleLowerCase()
              .trim()
              .includes(searchValue!.toLocaleLowerCase().trim())
          )
        )
      );
    // switch (selector) {
    //   case "distributionConcept":
    //     dispatch(
    //       setFilteredDataDistribution(
    //         distributionConceptProps.data.filter((el) =>
    //           el.description
    //             .toLocaleLowerCase()
    //             .trim()
    //             .includes(searchValue!.toLocaleLowerCase().trim() as string)
    //         )
    //       )
    //     );

    //     break;
    //   case "serviceConcept":
    //     dispatch(
    //       setFilteredDataService(
    //         serviceConceptProps.data.filter((el) =>
    //           el.description
    //             .toLocaleLowerCase()
    //             .trim()
    //             .includes(searchValue!.toLocaleLowerCase().trim())
    //         )
    //       )
    //     );
    //     break;
    //   default:
    //     // dispatch(setFilteredDataDistribution(null));
    //     // dispatch(setFilteredDataService(null));
    //     break;
    // }

    // return () => {};
  }, [dispatch, distributionConceptProps.data, searchValue, selector, serviceConceptProps.data]);
};

export default useReduxSearch;
