import { Redirect, Slot } from "expo-router";

export default function _Layout() {
    // 👇 switch this between true/false to test
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Redirect href="/sign-in" />;
    }

    return <Slot />;
}
