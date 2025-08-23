import { View, Text, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import seed from "@/lib/seed";
import * as Sentry from "@sentry/react-native";

const Search = () => {
    return (
        <SafeAreaView>
            <Text>Search</Text>

            <Button
                title={"seed"}
                onPress={() =>
                    seed().catch((err) => {
                        console.log("Failed to seed the database.", err);
                        Sentry.captureException(err); // ✅ report the error properly
                    })
                }
            />
        </SafeAreaView>
    );
};

export default Search;
