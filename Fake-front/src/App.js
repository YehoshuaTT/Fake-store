import { useState } from "react";
import UserLogin from "./components/Admin/UserLogin";
import ProjectContainer from "./components/Layout/ProjectContainer";
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
      {canLog && <ProjectContainer isAdmin={isAdmin} />}
    </div>
  );
}

export default App;
