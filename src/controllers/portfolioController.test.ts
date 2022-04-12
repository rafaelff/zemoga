import {PortfolioController} from "./portfolioController";

describe("Portfolio controller tests", () => {
  const mockUser = {
    username: 'testUser',
    name: 'Test user',
    email: 'testuser@email.com',
    image_path: 'http://test.image.url/image.jpg',
    experience: 'Test user esperience text.',
    address: 'Test user full address',
    zip_code: '88888888',
    phone: '99999999',
    twitter_user: 'test_user'
  };
  let portfolioController: PortfolioController;

  beforeAll(() => {
    portfolioController = new PortfolioController();
  });

  async function clearTestData() {
    try {
      await portfolioController.deleteItem(mockUser.username);
    } catch (e) {
    }
  }

  test("Portfolio table exists", async () => {
    const tables = await portfolioController.listTables();
    expect(tables).toContain('portfolio');
  });

  describe("Tests without the record on the table", () => {
    beforeEach(async () => {
      await clearTestData();
    });

    afterEach(async () => {
      await clearTestData();
    });

    test("Insert record", async () => {
      await expect(portfolioController.insertItem(mockUser))
        .resolves
        .not
        .toBeDefined();
    });

    test("Prevent deleting non existing record", async () => {
      await expect(portfolioController.deleteItem('mockUsername'))
        .rejects
        .toMatchObject({
          status: 404
        });
    });

    test("Return error when record not found", async () => {
      await expect(portfolioController.getItem('mockUsername'))
        .rejects
        .toMatchObject({
          status: 404
        });
    });
  });

  describe("Tests with record already on the table", () => {
    beforeEach(async () => {
      try {
        await portfolioController.insertItem(mockUser);
      } catch (e) {}
    });

    afterEach(async () => {
      await clearTestData();
    });

    test("Get record", async () => {
      const item = await portfolioController.getItem(mockUser.username);
      expect(item).toMatchObject(mockUser);
    });

    test("Prevent overwriting record", async () => {
      await expect(portfolioController.insertItem(mockUser))
        .rejects
        .toMatchObject({
          status: 400
        });
    });

    test("Update record", async () => {
      const mockUserCopy = Object.assign({}, mockUser);
      mockUserCopy.name = "Updated test user";
      await expect(portfolioController.updateItem(mockUserCopy))
        .resolves
        .not
        .toBeDefined();

      const item = await portfolioController.getItem(mockUserCopy.username);
      expect(item).toMatchObject(mockUserCopy);
    });

    test("Prevent updating non existing record", async () => {
      const mockUserCopy = Object.assign({}, mockUser);
      mockUserCopy.username = "testUsername";
      await expect(portfolioController.updateItem(mockUserCopy))
        .rejects
        .toMatchObject({
          status: 404
        });
    });

    test("Delete record", async () => {
      await expect(portfolioController.deleteItem(mockUser.username))
        .resolves
        .not
        .toBeDefined();
    });
  });
});
