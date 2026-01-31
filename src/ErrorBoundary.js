import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error("💥 ErrorBoundary caught:", error, info);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { style: { padding: 24 }, children: [_jsx("h2", { children: "\u26A0\uFE0F Etwas ist schiefgelaufen" }), _jsx("p", { children: "Die App l\u00E4uft weiter, aber ein Fehler ist aufgetreten." }), this.state.error && (_jsx("pre", { style: { color: "crimson", whiteSpace: "pre-wrap" }, children: this.state.error.message }))] }));
        }
        return this.props.children;
    }
}
