<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/* @author         Akshatha */
class ProductModel extends CI_model
{
    
    protected $productFields = [
		"Product_Name",
		"Sku_Code"
	];

	protected $productPricingFields = [
		"Product_Id",
		"Variant_Id",
		"Currency_Id",
		"Tenure",
		"Amount",
		"Amount_Per_Year",
		"Active_Status"
	];

	protected $productCurrencyFields = [
		"Currency_Name"
	];

	protected $productvarientFields = [
		"Product_Id",
		"Variant_Name"
	];
	function __construct()
	{
		parent::__construct();
	}
	public function fetch_all_products()
	{
		$query = $this->db->get('tm_product_master');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function fetch_all_product_pricing()
	{
		// $query = $this->db->get('tb_product_pricing');
		$query = $this->db->get('tb_product_pricing');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function fetchProductDetals($id)
    {
        $query = $this->db->select('tm_product_master.*')
            ->from('tm_product_master')
            ->join('tb_product_pricing', 'tb_product_pricing.Product_Id = tm_product_master.Id', 'left')
            ->where("tb_product_pricing.Id='$id'")
            ->get();
        return $query->result();
    }

    public function fetchProductPricingDetals($id)
    {
        $query = $this->db->select('tm_currency_master.*')
            ->from('tm_currency_master')
            ->join('tb_product_pricing', 'tb_product_pricing.Currency_Id = tm_currency_master.Id', 'left')
            ->where("tb_product_pricing.Id='$id'")
            ->get();
        return $query->result();
    }

    public function fetchProductVarientDetals($id)
    {
        $query = $this->db->select('tb_product_variant.*')
            ->from('tb_product_variant')
            ->join('tb_product_pricing', 'tb_product_pricing.Variant_Id = tb_product_variant.Id', 'left')
            ->where("tb_product_pricing.Id='$id'")
            ->get();
        return $query->result();
    }

	public function fetch_all_product_currency()
	{
		$query = $this->db->get('tm_currency_master');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function fetch_all_product_varient()
	{
		$query = $this->db->get('tb_product_variant');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

    public function addProducts($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->productFields)) {
                $values[$key] = $value;
            }
        }
		$this->db->insert('tm_product_master', $values);
		return $this->db->insert_id();
	}

	public function addProductPricing($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->productPricingFields)) {
                $values[$key] = $value;
            }
        }
		$this->db->insert('tb_product_pricing', $values);
		return $this->db->insert_id();
	}

	public function addProductCurrency($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->productCurrencyFields)) {
                $values[$key] = $value;
            }
        }
		$this->db->insert('tm_currency_master', $values);
		return $this->db->insert_id();
	}

	public function addProductvarient($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->productvarientFields)) {
                $values[$key] = $value;
            }
        }
		$this->db->insert('tb_product_variant', $values);
		return $this->db->insert_id();
	}

	public function updateProduct($data)
    {
    	$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->productFields)) {
                $values[$key] = $value;
            }
        }
        $this->db->where('Id', $data["Id"]);
        $this->db->update('tm_product_master', $values);
    }

	public function updateProductPricing($data)
    {
    	$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->productPricingFields)) {
                $values[$key] = $value;
            }
        }
        $this->db->where('Id', $data["Id"]);
        $this->db->update('tb_product_pricing', $values);
    }

    public function updateProductCurrency($data)
    {
    	$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->productCurrencyFields)) {
                $values[$key] = $value;
            }
        }
        $this->db->where('Id', $data["Id"]);
        $this->db->update('tm_currency_master', $values);
    }

    public function updateProductVarient($data)
    {
    	$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->productvarientFields)) {
                $values[$key] = $value;
            }
        }
        $this->db->where('Id', $data["Id"]);
        $this->db->update('tb_product_variant', $values);
    }
}

?>