import ManagePriceBookContainer from "containers/ManagePriceBookContainer";
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

const Router = () => {
  return (
    <RoutesRouter>
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <HomePage />
          </PageLayout>
        }
        path="/catalogo"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/catalogo/librodeprecios"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <ManagePriceBookPage>
              <ManagePriceBookContainer />
            </ManagePriceBookPage>
          </PageLayout>
        }
        path="/catalogo/manage/create"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <ManagePriceBookPage>
              <ManagePriceBookContainer />
            </ManagePriceBookPage>
          </PageLayout>
        }
        path="/catalogo/manage/edit/:editPbId"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/catalogo/librodeprecios/:regionalPbId"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/catalogo/librodeprecios/:regionalPbId/:branchPbId"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/catalogo/librodeprecios/:regionalPbId/:branchPbId/:vehiclePbId"
      />
      <Route
        element={
          <PageLayout pageName="Libro de precios">
            <PricebooksPage />
          </PageLayout>
        }
        path="/catalogo/librodeprecios/:regionalPbId/:branchPbId/:vehiclePbId/:distributorPbId"
      />
      <Route
        element={
          <PageLayout pageName="Simulador">
            <SimulatorPage />
          </PageLayout>
        }
        path="/catalogo/simulador"
      />
      <Route
        element={
          <PageLayout pageName="Asignar Libros">
            <AssignPriceBookPage />
          </PageLayout>
        }
        path="/catalogo/assign"
      />
    </RoutesRouter>
  );
};

export default Router;
