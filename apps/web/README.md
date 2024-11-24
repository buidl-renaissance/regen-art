We'll want to update this in the context of home affordability through the Detroit Housing Commission: https://detroitmi.gov/departments/housing-and-revitalization-department/affordable-housing

# **Make It a Home: Tokenized Real Estate and Repair Assistance**

Note: This is a working document.

## **Overview**

Make It Home enables eligible Detroiters occupying tax-foreclosed houses to become homeowners rather than face eviction. The program leverages the City of Detroit’s “right of refusal,” allowing the City to purchase properties before the tax foreclosure auction for the value of the back taxes owed, or two times the state equalized value (SEV) if a Claim of Interest was filed by the previous owner. These properties are then purchased by the [United Community Housing Coalition](https://www.uchcdetroit.org/who-we-are) using philanthropic funding from the [Rocket Community Fund](https://www.rocketcommunityfund.org/).  

UCHC sells the properties to the occupants through a 0% interest land contract with a payment plan that enables each resident to make payments into an escrow account for roughly a year until they reach the purchase price for their property. This year, families paid an average of $8,400 to achieve homeownership. Upon completing their payments, they receive the deed to their property, while also gaining access to home repair grants, loans and financial counseling provided through the program. 

In May 2022, the Center for Community Progress, with support from RCF, launched the Make it Home National Replication Initiative, which aimed to explore whether Make it Home could be replicated in other communities. Through the summer of 2022, we convened a Make it Home Learning Cohort, which helped thirteen selected communities learn about Detroit’s program and explore whether they could create a similar program in their communities.

Resources:
- https://detroitmi.gov/news/make-it-home-partnership-helps-nearly-100-more-families-become-homeowners
- https://detroitmi.gov/news/rocket-community-fund-united-community-housing-coalition-and-city-detroit-help-1500-detroit-families
- https://communityprogress.org/services/technical-assistance/mih-nri/

The following document outlines how blockchain technology could provide means to assist the resilience and growth of this program.

---

## **Key Features**

### **1. Real Estate Tokenization**
- **NFT Representation:** Each property is tokenized as an NFT, holding metadata for:
  - Ownership details.
  - Tax compliance status.
  - Improvement history.
- **Smart Contracts:** Automate property sales, tax collection, and rebate allocation.

---

### **2. Health and Habitability Repair Assistance**

The "Make It a Home" initiative prioritizes critical repairs to ensure homes meet health and safety standards. Blockchain technology can streamline this process, providing transparent and efficient solutions for homeowners, community stakeholders, and local government.

The repair program was created in 2019 to ensure the stability of Make It Home participants who were often experiencing the negative consequences of deferred maintenance. Through grants and 0% interest loans, UCHC helps residents address home health and habitability home repairs.

The following outlines how blockchain could assist in the future success of the program.

#### **Repair Fund Management**
- **Tokenized Repair Grants:**  
  - Each homeowner can access repair funding through tokenized grants.
  - Grants are allocated based on validated repair proposals, ensuring funds are used effectively.
- **Community Repair Staking Pools:**  
  - Local businesses and individuals can contribute to a staking pool specifically for repairs.
  - Contributors are rewarded with tokens or ecosystem benefits, fostering local collaboration.

#### **Repair Proposal and Validation**
- **Proposal Submission via dApp:**  
  - Homeowners log repair needs through a user-friendly decentralized application (dApp).  
  - Proposals include descriptions, cost estimates, and supporting documentation like photos or inspection reports.
- **Smart Contract Workflow:**  
  - Proposals trigger a smart contract that routes the request for approval.  
  - Approvals are based on predefined health and safety criteria set by local regulations.
- **Inspector Integration:**  
  - Municipal inspectors validate repair needs and log approvals on-chain.  
  - The blockchain record ensures transparency and avoids fund misuse.

#### **Repair Progress Monitoring**
- **Transparent Updates:**  
  - Homeowners document repair progress by uploading photos, videos, and receipts to the dApp.  
  - All data is immutably stored on the blockchain, accessible to funders and inspectors.
- **IoT Device Integration:**  
  - Optional IoT devices, such as leak detectors, air quality monitors, or temperature sensors, can monitor property conditions in real time.  
  - Data feeds directly into the blockchain to validate improvements and ongoing habitability.

#### **Incentives for Health and Safety**
- **Automated Tax Rebates:**  
  - Repairs that improve health and habitability trigger pre-defined rebate calculations.  
  - Rebates are issued directly through smart contracts, reducing administrative overhead.
- **Property Health Score:**  
  - Each property’s NFT includes a "health score" reflecting repair efforts and overall condition.  
  - Higher scores unlock benefits, such as lower interest rates on loans or priority access to additional funding.

#### **Community and Economic Impact**
- **Empowering Homeowners:**  
  - By making repair funding accessible and transparent, homeowners can address critical issues confidently.  
- **Incentivizing Local Collaboration:**  
  - Businesses supporting the repair pool contribute to community stability while gaining visibility and rewards.
- **Enhancing Property Values:**  
  - Regular repairs and improvements uplift property values, benefiting both owners and the broader community.

#### **User Flow for Repairs**
1. **Identification of Repairs:**  
   - Homeowner identifies critical repair needs or receives an inspection report outlining required fixes.
2. **Proposal Submission:**  
   - Repair details are submitted via the dApp, along with supporting evidence (photos, cost estimates).
3. **Approval and Fund Allocation:**  
   - Smart contracts route the proposal for approval. Once approved, funds are disbursed to approved contractors or the homeowner.
4. **Repair Execution:**  
   - Repairs are carried out, and progress is documented through regular updates.
5. **Completion and Validation:**  
   - Municipal inspectors validate repairs, and the NFT metadata updates to reflect the completed work.

This approach ensures that health and habitability remain a priority while leveraging blockchain technology to enhance efficiency and accountability. 

---

### **3. Decentralized Identifiers (DIDs) for Make It a Home**

To support transparency and secure participation in the "Make It a Home" initiative, the system will leverage Decentralized Identifiers (DIDs). These will manage and verify stakeholder identities, ensuring secure interactions and ongoing engagement throughout the program. [Read detailed docs here.](https://github.com/johngulb/gods.work/edit/main/apps/web/README.md)

#### **Key Features of DIDs**
1. **Identity Management:**
   - Issue unique DIDs to each participant (homeowners, inspectors, funders, contractors).
   - DIDs are linked to roles, contributions, and activities within the initiative (e.g., property ownership, repair status).

2. **Secure Transactions:**
   - DIDs ensure that all property-related transactions, tax payments, repair approvals, and other actions are securely verified and tracked.

3. **Real-Time Updates:**
   - Stakeholder records are dynamically updated on the blockchain, reflecting ongoing participation, repairs, and property improvements.

4. **Enhanced Trust and Transparency:**
   - The decentralized nature of DIDs ensures that all stakeholders have access to immutable and transparent records of participation and property status.

By incorporating DIDs, the initiative can provide a more robust and trustworthy system, improving engagement and accountability in the community.

---

## **Governance and Integration**
- **DAO Oversight:** A decentralized organization manages the community fund, approves proposals, and monitors tax rebates.
- **Government Collaboration:** Blockchain integration with local tax systems ensures accurate, real-time tracking and compliance.

---

## **Benefits**
- **Transparency:** Real-time tracking of ownership, tax payments, and repair progress.
- **Community Empowerment:** Encourages local investment and collaboration in housing initiatives.
- **Sustainability:** Incentivizes property maintenance and improvement for long-term habitability.

---

## **Next Steps**
1. Engage Detroit's local government, businesses, and community stakeholders.
2. Develop a prototype on a blockchain testnet (Ethereum or Cosmos).
3. Educate participants on using blockchain tools for homeownership and repairs.
4. Integrate DIDs for identity management and secure interactions.

---
