use warp::{ Filter, body::json };
use serde::Deserialize;

#[derive(Deserialize)]
struct MoveRequest {
    moves: String,
}

/// MAIN
#[tokio::main]
async fn main() {
    // GET /hello => 200 OK with body "Hello world"
    let hello_route = warp
        ::get()
        .and(warp::path("hello"))
        .and(warp::path::end())
        .and_then(hello_world);

    // POST /move => 200 OK with body MoveResponse
    let move_route = warp
        ::post()
        .and(warp::path("move"))
        .and(warp::path::end())
        .and(json())
        .and_then(make_move);

    let routes = hello_route.or(move_route);

    let cors = warp
        ::cors() // Create a CORS policy
        .allow_any_origin()
        .allow_methods(vec!["GET", "POST"]) // Allow only GET and POST methods
        .allow_headers(vec!["Content-Type"]);

    let routes = routes.with(cors);

    // Run server
    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}

///
/// Hello World handler
///
async fn hello_world() -> Result<impl warp::Reply, warp::Rejection> {
    println!("Hello World");
    let result = "Hello World";
    Ok(warp::reply::json(&result))
}

///
/// Check that the latest move is legal. If it is calculate board state.
///
async fn make_move(move_request: MoveRequest) -> Result<impl warp::Reply, warp::Rejection> {
    println!("Calculating Moves");

    let result = move_request.moves;

    Ok(warp::reply::json(&result))
}
