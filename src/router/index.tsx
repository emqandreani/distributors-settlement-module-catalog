import { store } from "app/store";
import ManagePriceBookContainer from "containers/ManagePriceBookContainer";
import { fetchPriceBooks } from "features/pricebook/asyncActions";
import PageLayout from "layout/PageLayout";
import React, { lazy } from "react";
import { Route, Routes as RoutesRouter } from "react-router-dom";

const HomePage = lazy(() => import("../pages/Home"));
const PricebooksPage = lazy(() => import("../pages/Pricebooks"));
const ManagePriceBookPage = lazy(() =>
  import("../pages/Pricebooks").then((module) => ({ default: module.ManagePriceBookPage }))
);
const SimulatorPage = lazy(() => import("../pages/Simulator"));
const AssignPriceBookPage = lazy(() => import("../pages/AssignPriceBook"));

store.dispatch(fetchPriceBooks());

const Router = () => {
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
    </RoutesRouter>
  );
};

export default Router;
