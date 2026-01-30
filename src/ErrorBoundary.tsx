import React from "react";

type Props = {
 children: React.ReactNode;
};

type State = {
 hasError: boolean;
 error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
 state: State = { hasError: false };

 static getDerivedStateFromError(error: Error) {
   return { hasError: true, error };
 }

 componentDidCatch(error: Error, info: React.ErrorInfo) {
   console.error("💥 ErrorBoundary caught:", error, info);
 }

 render() {
   if (this.state.hasError) {
     return (
       <div style={{ padding: 24 }}>
         <h2>⚠️ Etwas ist schiefgelaufen</h2>
         <p>Die App läuft weiter, aber ein Fehler ist aufgetreten.</p>

         {this.state.error && (
           <pre style={{ color: "crimson", whiteSpace: "pre-wrap" }}>
             {this.state.error.message}
           </pre>
         )}
       </div>
     );
   }

   return this.props.children;
 }
}