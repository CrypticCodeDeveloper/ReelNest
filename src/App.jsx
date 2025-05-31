import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {Toaster} from "react-hot-toast"
import MainLayout from "./layouts/mainLayout.jsx";
import Loader from "./components/loader.jsx";
import {Suspense} from "react";
import Home from "./pages/Home.jsx";
import MediaDetails from "./pages/MediaDetails.jsx";

import TrailerProvider from "./contexts/trailerProvider.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/details/:media/:id" element={<MediaDetails />} />
        </Route>
    )
)

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loader/>}>
                <TrailerProvider>
                    <RouterProvider router={router}/>
                </TrailerProvider>
                <Toaster
                    position="top-right"
                    toastOptions={
                        {
                            style: {
                                fontSize: '1rem',
                                backgroundColor: '#1a1a1a',
                                color: '#fff',
                            },
                        }
                    }
                />
            </Suspense>
        </QueryClientProvider>
    );
}

export default App
