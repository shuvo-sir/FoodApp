import {FlatList, Pressable, Text, Image, View, TouchableOpacity, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, offers } from "@/constants";
import React, { Fragment } from "react";
import cn from "clsx";
import CartButton from "@/components/CartButton";


export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={offers}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={({ item, index }) => {
                    const isEven = index % 2 === 0;
                    return (
                        <View className="mb-4">
                            <Pressable
                                className={cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
                                style={{ backgroundColor: item.color }}
                                android_ripple={{ color: "#ffffff22" }}
                            >
                                {({ pressed }) => (
                                    <Fragment>
                                        <View className="h-full w-1/2">
                                            <Image
                                                source={item.image}
                                                className="w-full h-full"
                                                resizeMode="contain"
                                            />
                                        </View>

                                        <View className={cn("offer-card__info", isEven ? "pl-10" : "pr-10")}>
                                            <Text className="h1-bold text-white leading-tight">
                                                {item.title}
                                            </Text>
                                            <Image
                                                source={images.arrowRight}
                                                className="w-10 h-10 mt-2"
                                                resizeMode="contain"
                                                tintColor="#ffffff"
                                            />
                                        </View>
                                    </Fragment>
                                )}
                            </Pressable>
                        </View>
                    );
                }}
                contentContainerClassName="pb-28 px-5"
                ListHeaderComponent={() => (
                    <View className="flex-between flex-row w-full my-5">
                        <View className="flex-start">
                            <Text className="small-bold text-primary">DELIVER TO</Text>
                            <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                                <Text className="paragraph-bold text-dark-100">Croatia</Text>
                                <Image
                                    source={images.arrowDown}
                                    className="w-3 h-3"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        <CartButton />
                    </View>
                )}
                // ListEmptyComponent={() => (
                //     <Text className="text-center text-gray-400 mt-10">No offers available.</Text>
                // )}
            />
        </SafeAreaView>
    );
}
