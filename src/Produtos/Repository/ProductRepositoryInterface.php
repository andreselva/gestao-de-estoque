<?php

namespace Andre\GestaoDeEstoque\Produtos\Repository;

use Andre\GestaoDeEstoque\Produtos\Entity\Product;

interface ProductRepositoryInterface
{
    public function saveProduct(Product $product);
    public function getAllProducts(?array $data): array;
    public function findProductById(string $id): array;
    public function saveProductEdit(Product $product): void;
    public function getProductsDropdown(string $toSearch): array;
}
