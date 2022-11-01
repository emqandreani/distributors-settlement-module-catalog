import { STATUS } from "constants/status";

import { useLocalDispatch, useLocalSelector } from "app/store";
import ManagePriceBookContainer from "containers/ManagePriceBookContainer";
import { selectorPricebookItem } from "features/pricebook-item/slice";
import { fetchPriceBooks } from "features/pricebook/asyncActions";
import { selectorPricebook } from "features/pricebook/slice";
import useReduxSearch from "hooks/useReduxSearch";
import PageLayout from "layout/PageLayout";
import React, { lazy, useEffect } from "react";
import { Route, Routes as RoutesRouter } from "react-router-dom";
import { SuspenseLoader } from "components/SuspenseLoader";
import { RejectedFallback } from "components/RejectedFallback";

const HomePage = lazy(() => import("../pages/Home"));
const PricebooksPage = lazy(() => import("../pages/Pricebooks"));
const ManagePriceBookPage = lazy(() =>
  import("../pages/Pricebooks").then((module) => ({ default: module.ManagePriceBookPage }))
);
const SimulatorPage = lazy(() => import("../pages/Simulator"));
const AssignPriceBookPage = lazy(() => import("../pages/AssignPriceBook"));
const CatalogConceptsPage = lazy(() => import("pages/CatalogConcepts"));

const Router = () => {
  useReduxSearch();
  const dispatch = useLocalDispatch();

  const { postPriceBookRequest, putPriceBookRequest } = useLocalSelector(selectorPricebook);
  const { response } = useLocalSelector(selectorPricebookItem);

  useEffect(() => {
    dispatch(fetchPriceBooks());
    if (postPriceBookRequest?.status || putPriceBookRequest?.status === STATUS.SUCCESSFUL) {
      dispatch(fetchPriceBooks());
    }
    if (response === STATUS.SUCCESSFUL) {
      dispatch(fetchPriceBooks());
    }
  }, [dispatch, postPriceBookRequest, putPriceBookRequest?.status, response]);

  return (
    <RoutesRouter>
      <Route
        index
        element={
          <PageLayout pageName="Libro de precios">
            <HomePage />
          </PageLayout>
        }
        path="/"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/librodeprecios"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/librodeprecios/:regionalPbId"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/librodeprecios/:regionalPbId/:branchPbId"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/librodeprecios/:regionalPbId/:branchPbId/:vehiclePbId"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/librodeprecios/:regionalPbId/:branchPbId/:vehiclePbId/:distributorPbId"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <ManagePriceBookPage>
              <ManagePriceBookContainer />
            </ManagePriceBookPage>
          </PageLayout>
        }
        path="/manage/create"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <ManagePriceBookPage>
              <ManagePriceBookContainer />
            </ManagePriceBookPage>
          </PageLayout>
        }
        path="/manage/edit/:editPbId"
      />

      <Route
        element={
          <PageLayout pageName="Simulador">
            <SimulatorPage />
          </PageLayout>
        }
        path="/simulador"
      />
      <Route
        element={
          <PageLayout pageName="Asignar Libros">
            <AssignPriceBookPage />
          </PageLayout>
        }
        path="/assign"
      />
      <Route
        element={
          <PageLayout pageName="Catálogo">
            <CatalogConceptsPage />
          </PageLayout>
        }
        path="/conceptos"
      />
    </RoutesRouter>
  );
};

export default Router;
