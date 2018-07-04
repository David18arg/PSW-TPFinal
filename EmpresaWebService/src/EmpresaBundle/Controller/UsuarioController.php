<?php

namespace EmpresaBundle\Controller;

use EmpresaBundle\Entity\Usuario;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;
/*AGREGADOs*/
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
/*AGREGADOs*/
/**
 * Usuario controller.
 *
 * @Route("usuario")
 */
class UsuarioController extends Controller
{
    /**
     * Validate user.
     *
     * @Route("/authenticate", name="usuario_authenticate")
     * @Method({"GET", "POST"})
     */
    public function authenticateAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);
        //creamos un usuario
        $usuario = $request->request->get('usuario');
        $password = $request->request->get('password');

        $criteria = array('usuario' => $usuario, 'password' => $password);
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("EmpresaBundle:Usuario")->findBy($criteria);
		
        if($user != null){
            $resultUsuario = $user[0];
        }else{
            //retorno un usuario sin datos
            $resultUsuario = new Usuario();
        }
        //genero la respuesta hacia el cliente
        $response = new Response();
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $response->setContent(json_encode(array(
        'usuario' => $serializer->serialize($resultUsuario, 'json'),
        )));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Lists all usuario entities.
     *
     * @Route("/", name="usuario_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $usuarios = $em->getRepository('EmpresaBundle:Usuario')->findAll();
        $response = new Response();
        $encoders = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $response->setContent(json_encode(array(
        'usuarios' => $serializer->serialize($usuarios, 'json'),
        )));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Creates a new usuario entity.
     *
     * @Route("/new", name="usuario_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);
        
        $usuario = new Usuario();
        $usuario->setApellido($request->request->get('apellido'));
        $usuario->setNombres($request->request->get('nombres'));
        $usuario->setDni($request->request->get('dni'));
        $usuario->setEmail($request->request->get('email'));
        $usuario->setTelefono($request->request->get('telefono'));
        $usuario->setUsuario($request->request->get('usuario'));
        $usuario->setPassword($request->request->get('password'));
        $usuario->setPerfil($request->request->get('perfil'));
        //guardamos en la bd
        $em = $this->getDoctrine()->getManager();
        $em->persist($usuario);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Finds and displays a usuario entity.
     *
     * @Route("/{id}", name="usuario_show")
     * @Method("GET")
     */
    public function showAction(Usuario $usuario)
    {
        $deleteForm = $this->createDeleteForm($usuario);

        return $this->render('usuario/show.html.twig', array(
            'usuario' => $usuario,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing usuario entity.
     *
     * @Route("/{id}/edit", name="usuario_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction($id, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);
        
        $em = $this->getDoctrine()->getManager();
        $usuario = $em->getRepository('EmpresaBundle:Usuario')->find($id);
        
        $usuario->setApellido($request->request->get('apellido'));
        $usuario->setNombres($request->request->get('nombres'));
        $usuario->setDni($request->request->get('dni'));
        $usuario->setEmail($request->request->get('email'));
        $usuario->setTelefono($request->request->get('telefono'));
        $usuario->setUsuario($request->request->get('usuario'));
        $usuario->setPassword($request->request->get('password'));
        $usuario->setPerfil($request->request->get('perfil'));
        //guardamos en la bd
        $em = $this->getDoctrine()->getManager();
        $em->persist($usuario);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Deletes a usuario entity.
     *
     * @Route("/delete/{id}", name="usuario_delete")
     * @Method("DELETE")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $usuario = $em->getRepository('EmpresaBundle:Usuario')->find($id);
        if (!$usuario){
            throw $this->createNotFoundException('id incorrecta');
        }
        $em->remove($usuario);
        $em->flush();
        $result['status'] = 'ok';
        return new Response(json_encode($result), 200);
    }

    /**
     * Creates a form to delete a usuario entity.
     *
     * @param Usuario $usuario The usuario entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Usuario $usuario)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('usuario_delete', array('id' => $usuario->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
