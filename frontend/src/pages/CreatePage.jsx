import React, { useState } from "react";
import {
  Input,
  Container,
  VStack,
  Box,
  Heading,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const formattedProduct = {
      name: newProduct.name.trim(),
      price: Number(newProduct.price), // Ensure price is a number
      image: newProduct.image.trim(),
    };

    const { success, message } = await createProduct(formattedProduct);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });

    if (success) {
      setNewProduct({ name: "", price: "", image: "" }); // Reset input fields on success
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
