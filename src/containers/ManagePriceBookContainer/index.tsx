import { priceBookConceptColumns } from "constants/priceBookConceptColumns";
import { STATUS } from "constants/status";

import { ConceptItemDialog } from "components/ConceptItemDialog";
import { PriceBookConcept } from "components/PriceBookConcept";
import { PriceBookHeaderManage } from "components/PricebookHeader";
import { useEffect } from "react";
import { PriceBookDialog } from "components/PriceBookDialog";
import { AlertSnack } from "components/AlertSnack";
import { useNavigate, useParams } from "react-router";
import { priceBookConceptsTableAdapter } from "adapters/priceBookConceptsTableAdapter";
import useConceptTables from "hooks/useConceptTables";
import { IPriceBook } from "interfaces/pricebook";
import { useLocalDispatch, useLocalSelector } from "app/store";
import { selectorLayout, togglePbSnack } from "features/layout/slice";
import { cleanPriceBookRequest, selectorPricebook } from "features/pricebook/slice";
import { IDistributionConceptItem } from "interfaces/distribution-concept";
import { IServiceConceptItem } from "interfaces/service-concept";

const ManagePriceBookContainer = () => {
  const { toggleConceptItemDialog, togglePriceBookSnack } = useLocalSelector(selectorLayout);

  const { ...priceBooksDynamicsProps } = useLocalSelector(selectorPricebook);
  const { filteredDistribution, filteredServices } = useConceptTables(
    priceBooksDynamicsProps.data as IPriceBook
  );
  const { serviceConceptItems, distributionConceptItems } =
    priceBooksDynamicsProps.data as IPriceBook;
  const dispatch = useLocalDispatch();

  const navigate = useNavigate();
  const { editPbId } = useParams();

  useEffect(() => {
    if (priceBooksDynamicsProps.postPriceBookRequest?.status === STATUS.SUCCESSFUL) {
      dispatch(togglePbSnack(true));
    }
    if (priceBooksDynamicsProps.putPriceBookRequest?.status === STATUS.SUCCESSFUL) {
      dispatch(togglePbSnack(true));
    }

    return () => {
      dispatch(togglePbSnack(false));
    };
  }, [
    dispatch,
    priceBooksDynamicsProps.postPriceBookRequest?.status,
    priceBooksDynamicsProps.putPriceBookRequest?.status,
  ]);

  return (
    <>
      <PriceBookHeaderManage
        backTo={{ name: "Volver", path: editPbId ? "./../../.." : "./../.." }}
      />
      {editPbId && (
        <>
          <PriceBookConcept
            defaultOpen
            priceBookConceptColumns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              priceBooksDynamicsProps.data as IPriceBook,
              filteredDistribution ?? (distributionConceptItems as IDistributionConceptItem[]),
              "distribution"
            )}
            tableTitle="Conceptos de Distribucion"
            type="distribution"
          />

          <PriceBookConcept
            defaultOpen
            priceBookConceptColumns={priceBookConceptColumns}
            rows={priceBookConceptsTableAdapter(
              priceBooksDynamicsProps.data as IPriceBook,
              filteredServices ?? (serviceConceptItems as IServiceConceptItem[]),
              "service"
            )}
            tableTitle="Conceptos de Servicios"
            type="service"
          />
        </>
      )}
      {toggleConceptItemDialog && (
        <ConceptItemDialog
          open={toggleConceptItemDialog}
          priceBookName={"Nombre del libro nuevo"}
        />
      )}
      {priceBooksDynamicsProps.newPriceBook && <PriceBookDialog open requestType="create" />}
      {priceBooksDynamicsProps.editedPriceBook && <PriceBookDialog open requestType="edit" />}
      {priceBooksDynamicsProps.postPriceBookRequest?.status === STATUS.SUCCESSFUL && (
        <AlertSnack
          message={`Libro de precios ${priceBooksDynamicsProps.postPriceBookRequest.name} creado con éxito`}
          open={togglePriceBookSnack}
          type="success"
          onClose={() => {
            dispatch(togglePbSnack(false));
            dispatch(cleanPriceBookRequest({ payload: null, type: "post" }));
            navigate("/catalogo/librodeprecios");
          }}
        />
      )}
      {priceBooksDynamicsProps.putPriceBookRequest?.status === STATUS.SUCCESSFUL && (
        <AlertSnack
          message={`Libro de precios ${priceBooksDynamicsProps.putPriceBookRequest.name} modificado con éxito`}
          open={togglePriceBookSnack}
          type="success"
          onClose={() => {
            dispatch(togglePbSnack(false));
            dispatch(cleanPriceBookRequest({ payload: null, type: "put" }));
            navigate("/catalogo/librodeprecios");
          }}
        />
      )}
    </>
  );
};

export default ManagePriceBookContainer;
