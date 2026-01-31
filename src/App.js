import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
/* 🔍 Global Search */
import { searchAll } from "./utils/search";
/* 💾 IndexedDB */
import { openDB } from "./storage/db";
import WorkshopView from "./views/WorkshopView";
import ShelfRoute from "./routes/ShelfRoute";
import BoxRoute from "./routes/BoxRoute";
/* =========================
   APP ROOT
   ========================= */
export default function App() {
    const [shelves, setShelves] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [tools, setTools] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    /* 🔍 Suche */
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    /* =========================
       LOAD from IndexedDB
       ========================= */
    useEffect(() => {
        async function load() {
            const db = await openDB();
            const readAll = (store) => new Promise((resolve, reject) => {
                const tx = db.transaction(store, "readonly");
                const req = tx.objectStore(store).getAll();
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject();
            });
            setShelves(await readAll("shelves"));
            setBoxes(await readAll("boxes"));
            setTools(await readAll("tools"));
            setMaterials(await readAll("materials"));
            setIsLoaded(true);
        }
        load();
    }, []);
    /* =========================
       GLOBALE SUCHE
       ========================= */
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        setSearchResults(searchAll({
            query: searchQuery,
            shelves,
            boxes,
            tools,
            materials,
        }));
    }, [searchQuery, shelves, boxes, tools, materials]);
    /* =========================
       HELPERS
       ========================= */
    async function dbAdd(store, value) {
        const db = await openDB();
        db.transaction(store, "readwrite").objectStore(store).add(value);
    }
    async function dbPut(store, value) {
        const db = await openDB();
        db.transaction(store, "readwrite").objectStore(store).put(value);
    }
    async function dbDelete(store, id) {
        const db = await openDB();
        db.transaction(store, "readwrite").objectStore(store).delete(id);
    }
    /* ⛔️ WICHTIG: Keine Routen bevor Daten geladen sind */
    if (!isLoaded)
        return null;
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(WorkshopView, { shelves: shelves, boxes: boxes, tools: tools, materials: materials, searchQuery: searchQuery, onSearchChange: setSearchQuery, searchResults: searchResults, onAddShelf: async (name) => {
                        const shelf = { id: crypto.randomUUID(), name };
                        await dbAdd("shelves", shelf);
                        setShelves((p) => [...p, shelf]);
                    }, onUpdateShelf: async (id, name) => {
                        setShelves((prev) => prev.map((s) => {
                            if (s.id !== id)
                                return s;
                            const updated = { ...s, name };
                            dbPut("shelves", updated);
                            return updated;
                        }));
                    }, onDeleteShelf: async (id) => {
                        await dbDelete("shelves", id);
                        setShelves((p) => p.filter((s) => s.id !== id));
                    } }) }), _jsx(Route, { path: "/shelf/:shelfId", element: _jsx(ShelfRoute, { shelves: shelves, boxes: boxes, tools: tools, materials: materials, setBoxes: setBoxes, setTools: setTools, setMaterials: setMaterials, dbAdd: dbAdd, dbPut: dbPut, dbDelete: dbDelete }) }), _jsx(Route, { path: "/box/:boxId", element: _jsx(BoxRoute, { boxes: boxes, tools: tools, shelves: shelves, materials: materials, setTools: setTools, setMaterials: setMaterials, dbAdd: dbAdd, dbPut: dbPut, dbDelete: dbDelete }) })] }));
}
