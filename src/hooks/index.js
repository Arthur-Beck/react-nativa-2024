import { AuthProvider } from "./Auth";
import { DataProvider } from "./Data";
import { FontProvider } from "./Font";
import { ConfigProvider } from "./Config";

export function AppProvider({ children }) {
    return (
        <FontProvider>
            <DataProvider>
                <AuthProvider>
                    <ConfigProvider>
                        {children}
                    </ConfigProvider>
                </AuthProvider>
            </DataProvider>
        </FontProvider>
    );
}