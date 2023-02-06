import { useState } from "react";
import UserLogin from "./pages/UserLogin";
import ProjectContainer from "./pages/ProjectContainer";
function App() {
  const [canLog, setCanLog] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="app">
      {!canLog && (
        <UserLogin
          setCanLog={setCanLog}
          canLog={canLog}
          setIsAdmin={setIsAdmin}
        />
      )}
      {canLog && <ProjectContainer isAdmin={isAdmin} setCanLog={setCanLog} />}
    </div>
  );
}

export default App;
