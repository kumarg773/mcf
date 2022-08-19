<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/* @author         Akshatha */
class PartnerModel extends CI_model
{

	protected $partnerFields = [
		"Partner_Name",
		"Address",
		"Country",
		"Sate",
		"Zip_Code",
		"Currency",
		"Tenure",
		"Start_Date",
		"Due_Date",
		"Partner_Type",
		"Rating"
	];
	protected $commissionFields = [
        "Partner_Id",
		"Product_Id",
		"First_Cut_Percentage",
		"First_Cut_Startdate",
		"Progressive_Cut_Percentage",
		"Progressive_Cut_Startdate",
		"Remarks"
	];
	protected $contactFields = [
        "Contact_Person_Name",
		"Designation",
		"Mobile_Number",
		"Alternate_Number",
		"Email_Address",
		"Partner_Id"
	];
	protected $inventoryFields = [
        "Billing_ContactPerson_Name",
		"Partner_Designation",
		"Partner_Mobile_Number",
		"Partner_Alternate_Number",
		"Partner_Email_Address",
		"Card_Type",
		"Mode_Of_Payment",
		"Card_Holder_Name",
		"Card_Number",
		"Expiry_Month",
		"Expiry_Year",
		"Bank_Name",
		"Account_Number",
		"Ifsc_Code",
		"Partner_Country",
		"Swift_Code",
		"Branch_Address",
		"Partner_Id",
		"Remarks"
	];


	function __construct()
	{
		parent::__construct();
	}
	public function fetch_all_partner()
	{
		$query = $this->db->get('tm_partner_details');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function fetch_all_commission($id)
	{
		$query = $this->db->select('tb_partner_product.*')
            ->from('tb_partner_product')
            ->join('tm_partner_details', 'tm_partner_details.Id = tb_partner_product.Partner_Id', 'left')
            ->where("tm_partner_details.Id='$id'")
            ->get();
        return $query->result();
	}

	public function fetch_all_contact($id)
	{
		$query = $this->db->select('tb_partner_contact_details.*')
            ->from('tb_partner_contact_details')
            ->join('tm_partner_details', 'tm_partner_details.Id = tb_partner_contact_details.Partner_Id', 'left')
            ->where("tm_partner_details.Id='$id'")
            ->get();
        return $query->result();
	}

	public function fetch_all_inventory($id)
	{
		$query = $this->db->select('tb_partner_inventory_details.*')
            ->from('tb_partner_inventory_details')
            ->join('tm_partner_details', 'tm_partner_details.Id = tb_partner_inventory_details.Partner_Id', 'left')
            ->where("tm_partner_details.Id='$id'")
            ->get();
        return $query->result();
	}

	public function addPartner($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->partnerFields)) {
                $values[$key] = $value;
            }
        }
        $commission = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->commissionFields)) {
                $commission[$key] = $value;
            }
        }
        $contact = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->contactFields)) {
                $contact[$key] = $value;
            }
        }
        $inventory = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->inventoryFields)) {
                $inventory[$key] = $value;
            }
        }

		$this->db->insert('tm_partner_details', $values);
		$partner = $this->db->insert_id();
		$commission['Partner_Id'] = $partner;
		$this->db->insert('tb_partner_product', $commission);
		$contact['Partner_Id'] = $partner;
		$this->db->insert('tb_partner_contact_details', $contact);
		$inventory['Partner_Id'] = $partner;
		$this->db->insert('tb_partner_inventory_details', $inventory);
		return $partner;
	}

	public function updatePartner($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->partnerFields)) {
                $values[$key] = $value;
            }
        }
        $commission = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->commissionFields)) {
                $commission[$key] = $value;
            }
        }
        $contact = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->contactFields)) {
                $contact[$key] = $value;
            }
        }
        $inventory = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->inventoryFields)) {
                $inventory[$key] = $value;
            }
        }
   
		$this->db->where('Id', $data["Id"]);
        $this->db->update('tm_partner_details', $values);
        $Partner_Id = $data["Id"];
        $commission['Partner_Id'] = $Partner_Id;
		$this->db->where('Id', $data["partnerProduct"][0]["Id"]);
        $this->db->update('tb_partner_product', $commission);
        $contact['Partner_Id'] = $Partner_Id;
		$this->db->where('Id', $data["partnerContact"][0]["Id"]);
        $this->db->update('tb_partner_contact_details', $contact);
        $inventory['Partner_Id'] = $Partner_Id;
		$this->db->where('Id', $data["partnerInventory"][0]["Id"]);
        $this->db->update('tb_partner_inventory_details', $inventory);
	}
}
?>